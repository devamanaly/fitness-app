    // components/Dashboard/nutrition/AddMealModal.tsx
    'use client'

    import { useState } from 'react'
    import { X, Search, Plus, Coffee, Sun, Cookie, Moon, Utensils } from 'lucide-react'

    type AddMealModalProps = {
    mealId: string | null
    onClose: () => void
    }

    const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: Coffee },
    { id: 'lunch', name: 'Lunch', icon: Sun },
    { id: 'snacks', name: 'Snacks', icon: Cookie },
    { id: 'dinner', name: 'Dinner', icon: Moon },
    { id: 'supper', name: 'Supper', icon: Moon },
    ]

    const commonFoods = [
    { name: 'Grilled Chicken Breast', calories: 280, protein: 45, carbs: 0, fat: 8, serving: '150g' },
    { name: 'Brown Rice', calories: 140, protein: 3, carbs: 30, fat: 1, serving: '100g' },
    { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, serving: '1 bowl' },
    { name: 'Greek Yogurt', calories: 100, protein: 15, carbs: 6, fat: 2, serving: '150g' },
    { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0, serving: '1 medium' },
    { name: 'Apple', calories: 95, protein: 0, carbs: 25, fat: 0, serving: '1 medium' },
    { name: 'Almonds', calories: 55, protein: 2, carbs: 2, fat: 5, serving: '10 pieces' },
    { name: 'Egg', calories: 78, protein: 6, carbs: 1, fat: 5, serving: '1 large' },
    ]

    export function AddMealModal({ mealId, onClose }: AddMealModalProps) {
    const [selectedMeal, setSelectedMeal] = useState(mealId || 'breakfast')
    const [search, setSearch] = useState('')
    const [selectedFoods, setSelectedFoods] = useState<typeof commonFoods>([])
    const [customFood, setCustomFood] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        serving: '',
    })
    const [showCustom, setShowCustom] = useState(false)

    const filteredFoods = commonFoods.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
    )

    const toggleFood = (food: typeof commonFoods[0]) => {
        const exists = selectedFoods.find((f) => f.name === food.name)
        if (exists) {
        setSelectedFoods(selectedFoods.filter((f) => f.name !== food.name))
        } else {
        setSelectedFoods([...selectedFoods, food])
        }
    }

    const handleAddCustom = () => {
        if (!customFood.name || !customFood.calories) return
        setSelectedFoods([
        ...selectedFoods,
        {
            name: customFood.name,
            calories: parseInt(customFood.calories),
            protein: parseInt(customFood.protein) || 0,
            carbs: parseInt(customFood.carbs) || 0,
            fat: parseInt(customFood.fat) || 0,
            serving: customFood.serving || '1 serving',
        },
        ])
        setCustomFood({ name: '', calories: '', protein: '', carbs: '', fat: '', serving: '' })
        setShowCustom(false)
    }

    const handleSave = () => {
        // Will connect to backend later
        onClose()
    }

    const totalCalories = selectedFoods.reduce((sum, f) => sum + f.calories, 0)

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        <div className="relative w-full sm:max-w-2xl bg-[#111113] border border-white/10 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.06] shrink-0">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Log Meal</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                {selectedFoods.length} item{selectedFoods.length !== 1 ? 's' : ''} · {totalCalories} kcal
                </p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
                <X className="w-5 h-5" />
            </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Meal Type Selector */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Meal Type</label>
                <div className="grid grid-cols-5 gap-2">
                {mealTypes.map((meal) => {
                    const Icon = meal.icon
                    const isActive = selectedMeal === meal.id
                    return (
                    <button
                        key={meal.id}
                        onClick={() => setSelectedMeal(meal.id)}
                        className={`
                        flex flex-col items-center gap-1.5 py-2.5 rounded-xl border transition-all
                        ${isActive
                            ? 'bg-red-600/15 border-red-500/50 text-red-400'
                            : 'bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20'
                        }
                        `}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="text-[10px] font-medium">{meal.name}</span>
                    </button>
                    )
                })}
                </div>
            </div>

            {/* Search */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Search Food</label>
                <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for food..."
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05]"
                />
                </div>
            </div>

            {/* Selected Foods */}
            {selectedFoods.length > 0 && (
                <div>
                <label className="block text-sm text-gray-400 mb-2">
                    Selected ({selectedFoods.length})
                </label>
                <div className="space-y-2">
                    {selectedFoods.map((food, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between py-2 px-3 bg-red-600/5 border border-red-500/20 rounded-lg"
                    >
                        <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-white truncate">{food.name}</p>
                        <p className="text-[10px] text-gray-500">{food.serving}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-2">
                        <span className="text-xs text-red-400 font-medium">{food.calories} kcal</span>
                        <button
                            onClick={() => toggleFood(food)}
                            className="text-gray-500 hover:text-red-400"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {/* Common Foods */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Common Foods</label>
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {filteredFoods.map((food) => {
                    const isSelected = selectedFoods.some((f) => f.name === food.name)
                    return (
                    <button
                        key={food.name}
                        onClick={() => toggleFood(food)}
                        className={`
                        w-full flex items-center justify-between py-2.5 px-3 rounded-lg transition-all text-left
                        ${isSelected
                            ? 'bg-red-600/10 border border-red-500/30'
                            : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                        }
                        `}
                    >
                        <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-200 truncate">{food.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500">{food.serving}</span>
                            <span className="text-[10px] text-gray-700">•</span>
                            <span className="text-[10px] text-gray-500">
                            P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                            </span>
                        </div>
                        </div>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                        <span className="text-xs text-gray-400">{food.calories}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-red-600 border-red-600' : 'border-white/20'
                        }`}>
                            {isSelected && <Plus className="w-3 h-3 text-white rotate-45" />}
                        </div>
                        </div>
                    </button>
                    )
                })}
                </div>
            </div>

            {/* Custom Food Toggle */}
            {!showCustom ? (
                <button
                onClick={() => setShowCustom(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-white/[0.1] hover:border-red-500/40 text-gray-400 hover:text-red-400 text-sm font-medium rounded-xl transition-all"
                >
                <Plus className="w-4 h-4" />
                Add Custom Food
                </button>
            ) : (
                <div className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Custom Food</p>
                    <button onClick={() => setShowCustom(false)} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Food name"
                    value={customFood.name}
                    onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['calories', 'protein', 'carbs', 'fat'] as const).map((field) => (
                    <input
                        key={field}
                        type="number"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={customFood[field]}
                        onChange={(e) => setCustomFood({ ...customFood, [field]: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50"
                    />
                    ))}
                </div>
                <button
                    onClick={handleAddCustom}
                    className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 text-sm font-medium rounded-lg transition-all"
                >
                    Add to Meal
                </button>
                </div>
            )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-white/[0.06] shrink-0 bg-[#0d0d0e]">
            <div className="flex items-center gap-3">
                <button
                onClick={onClose}
                className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 rounded-xl font-medium transition-all"
                >
                Cancel
                </button>
                <button
                onClick={handleSave}
                disabled={selectedFoods.length === 0}
                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Save Meal
                </button>
            </div>
            </div>
        </div>
        </div>
    )
    }