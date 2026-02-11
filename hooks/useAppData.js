import { useEffect, useMemo, useState } from 'react'
import { users as sampleUsers } from '../data/sampleUsers'

export default function useAppData(initialFilters = {}) {
    const [users, setUsers] = useState([])
    const [currentUserId] = useState(1)
    const [activeFilters, setActiveFilters] = useState({ districts: [], budget: '', sleep: null, social: null, clean: null, pets: null })
    const [sortBy, setSortBy] = useState('compatibility')
    const [profileModalUser, setProfileModalUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [toast, setToast] = useState({ visible: false, message: '', icon: '✓' })

    useEffect(() => {
        // initialize users from sample data
        setUsers(sampleUsers)
        // apply initial filters from caller (e.g., query params)
        if (initialFilters) {
            setActiveFilters(prev => ({ ...prev, ...initialFilters }))
        }
    }, [])

    const currentUser = useMemo(() => users.find(u => u.id === currentUserId) || null, [users, currentUserId])

    function showToast(message, icon = '✓') {
        setToast({ visible: true, message, icon })
        setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000)
    }

    function calculateCompatibility(user) {
        if (!currentUser) return 50
        let score = 50
        if (user.sleep === currentUser.sleep) score += 15
        if (user.social === currentUser.social) score += 15
        if (user.clean === currentUser.clean) score += 10
        if (user.pets === currentUser.pets || user.pets === 'friendly' || currentUser.pets === 'friendly') score += 10
        return Math.min(score, 98)
    }

    function applyFilters({ districts, budget, sleep, social, clean, pets } = {}) {
        setActiveFilters(prev => ({ ...prev, districts: districts ?? prev.districts, budget: budget ?? prev.budget, sleep: sleep ?? prev.sleep, social: social ?? prev.social, clean: clean ?? prev.clean, pets: pets ?? prev.pets }))
    }

    function resetFilters() {
        setActiveFilters({ districts: [], budget: '', sleep: null, social: null, clean: null, pets: null })
    }

    function sendMatchRequest(targetId) {
        showToast('Match request sent! 💫', '✓')
        // Could integrate with real backend here
    }


    function openProfile(userId) {
        const u = users.find(x => x.id === userId)
        setProfileModalUser(u || null)
    }

    function openCurrentUserProfile() {
        if (currentUser) setProfileModalUser(currentUser)
    }

    function closeProfile() {
        setProfileModalUser(null)
    }

    function getFilteredUsers() {
        let filtered = users.filter(u => u.id !== currentUserId)

        if (activeFilters.districts.length > 0) filtered = filtered.filter(u => activeFilters.districts.includes(u.districtName) || activeFilters.districts.includes(u.district))

        if (activeFilters.budget) {
            const [min, max] = activeFilters.budget.split('-').map(v => v === '+' ? 100 : parseInt(v))
            filtered = filtered.filter(u => u.budgetMin >= (min || 0) && u.budgetMax <= (max || 100))
        }

        if (activeFilters.sleep) filtered = filtered.filter(u => u.sleep === activeFilters.sleep)
        if (activeFilters.social) filtered = filtered.filter(u => u.social === activeFilters.social)
        if (activeFilters.clean) filtered = filtered.filter(u => u.clean === activeFilters.clean)
        if (activeFilters.pets) filtered = filtered.filter(u => u.pets === activeFilters.pets)

        switch (sortBy) {
            case 'rating':
                filtered.sort((a, b) => b.avgRating - a.avgRating)
                break
            case 'budget-low':
                filtered.sort((a, b) => a.budgetMin - b.budgetMin)
                break
            case 'budget-high':
                filtered.sort((a, b) => b.budgetMax - a.budgetMax)
                break
            default:
                filtered.sort((a, b) => calculateCompatibility(b) - calculateCompatibility(a))
        }

        return filtered
    }

    function sendMessage(targetId, message) {
        if (!message) return
        const m = { id: Date.now(), user_id: currentUserId, target_id: targetId, message, timestamp: new Date().toISOString(), status: 'sent' }
        setMessages(prev => [...prev, m])
        showToast('Message sent', '✓')
    }

    return {
        users,
        currentUser,
        getFilteredUsers,
        activeFilters,
        applyFilters,
        resetFilters,
        sortBy,
        setSortBy,
        calculateCompatibility,
        openProfile,
        openCurrentUserProfile,
        closeProfile,
        profileModalUser,
        sendMatchRequest,
        messages,
        sendMessage,
        toast
    }
}
