import { useEffect, useMemo, useState } from 'react'
import { users as sampleUsers } from '../data/sampleUsers'

export default function useAppData(initialFilters = {}) {
    const [users, setUsers] = useState([])
    const [currentUserId] = useState(1)
    const [activeFilters, setActiveFilters] = useState({
        districts: [],
        budget: '',
        sleep: null,
        social: null,
        clean: null,
        pets: null,
        smoking: null,
        noise: null,
        guests: null
    })
    const [sortBy, setSortBy] = useState('compatibility')
    const [profileModalUser, setProfileModalUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [toast, setToast] = useState({ visible: false, message: '', icon: '✓' })
    const [savedProfileIds, setSavedProfileIds] = useState([])

    useEffect(() => {
        // initialize users from sample data
        const normalizedUsers = sampleUsers.map((user, index) => {
            const seed = user.id ?? index + 1
            const smokingFallback = ['no', 'occasionally', 'yes'][seed % 3]
            const noiseFallback = ['quiet', 'normal', 'lively'][Math.floor(seed / 2) % 3]
            const guestsFallback = ['rare', 'sometimes', 'often'][Math.floor(seed / 3) % 3]

            return {
                ...user,
                smoking: user.smoking ?? smokingFallback,
                noise: user.noise ?? noiseFallback,
                guests: user.guests ?? guestsFallback
            }
        })
        setUsers(normalizedUsers)
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

    function applyFilters({ districts, budget, sleep, social, clean, pets, smoking, noise, guests } = {}) {
        setActiveFilters(prev => ({
            ...prev,
            districts: districts ?? prev.districts,
            budget: budget ?? prev.budget,
            sleep: sleep ?? prev.sleep,
            social: social ?? prev.social,
            clean: clean ?? prev.clean,
            pets: pets ?? prev.pets,
            smoking: smoking ?? prev.smoking,
            noise: noise ?? prev.noise,
            guests: guests ?? prev.guests
        }))
    }

    function resetFilters() {
        setActiveFilters({
            districts: [],
            budget: '',
            sleep: null,
            social: null,
            clean: null,
            pets: null,
            smoking: null,
            noise: null,
            guests: null
        })
    }

    function sendMatchRequest(targetId) {
        showToast('Match request sent! 💫', '✓')
        // Could integrate with real backend here
    }

    function isProfileSaved(userId) {
        return savedProfileIds.includes(userId)
    }

    function toggleSavedProfile(userId) {
        const user = users.find(u => u.id === userId)
        if (!user) return

        setSavedProfileIds(prev => {
            const exists = prev.includes(userId)
            if (exists) {
                showToast(`Đã bỏ lưu hồ sơ của ${user.name}`, '🗑️')
                return prev.filter(id => id !== userId)
            }
            showToast(`Đã lưu hồ sơ của ${user.name}`, '💾')
            return [...prev, userId]
        })
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
        if (activeFilters.smoking) filtered = filtered.filter(u => u.smoking === activeFilters.smoking)
        if (activeFilters.noise) filtered = filtered.filter(u => u.noise === activeFilters.noise)
        if (activeFilters.guests) filtered = filtered.filter(u => u.guests === activeFilters.guests)

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
        isProfileSaved,
        toggleSavedProfile,
        savedProfiles: users.filter(u => savedProfileIds.includes(u.id)),
        messages,
        sendMessage,
        toast
    }
}
