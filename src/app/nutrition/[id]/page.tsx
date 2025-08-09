'use client';

import { useSingleNutritionQuery, useUpdateNutritionMutation } from '@/redux/features/nutritions/NutritionAPI';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function EditNutrition() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useSingleNutritionQuery(id);
  const [updateNutrition, { isLoading: isUpdating }] = useUpdateNutritionMutation();

  const [formData, setFormData] = useState({
    title: '',
    calories: '',
    protein: '',
    carbohydrate: '',
    fat: '',
    fiber: '',
    rating: '',
    reviewsCount: '',
    ingredients: [''],
    instruction: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Prefill form
  useEffect(() => {
    if (data?.data?.nutrition) {
      const n = data.data.nutrition;
      setFormData({
        title: n.title || '',
        calories: String(n.calories || ''),
        protein: String(n.protein || ''),
        carbohydrate: String(n.carbohydrate || ''),
        fat: String(n.fat || ''),
        fiber: String(n.fiber || ''),
        rating: String(n.rating || ''),
        reviewsCount: String(n.reviewsCount || ''),
        ingredients: n.ingredients || [''],
        instruction: n.instruction || ''
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...formData.ingredients];
    updated[index] = value;
    setFormData(prev => ({ ...prev, ingredients: updated }));
  };

  const handleAddIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const handleRemoveIngredient = (index: number) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ingredients: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('data', JSON.stringify({
      ...formData,
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbohydrate: Number(formData.carbohydrate),
      fat: Number(formData.fat),
      fiber: Number(formData.fiber),
      rating: Number(formData.rating),
      reviewsCount: Number(formData.reviewsCount)
    }));
    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      const response = await updateNutrition({ id, formData: payload }).unwrap();
      toast.success(response?.message || 'Nutrition updated successfully!');
      window.location.href ='/nutrition';
    } catch (error) {
      console.error(error);
      toast.error('Failed to update nutrition.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto bg-white text-black p-6 shadow rounded-lg mt-6">
      <button
        onClick={() => router.back()}
        className="mb-6 bg-blue-400 px-4 py-2 rounded"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Edit Nutrition</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter nutrition title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'calories', label: 'Calories', placeholder: 'e.g. 200' },
            { name: 'protein', label: 'Protein (g)', placeholder: 'e.g. 15' },
            { name: 'carbohydrate', label: 'Carbohydrate (g)', placeholder: 'e.g. 30' },
            { name: 'fat', label: 'Fat (g)', placeholder: 'e.g. 10' },
            { name: 'fiber', label: 'Fiber (g)', placeholder: 'e.g. 5' },
            { name: 'rating', label: 'Rating', placeholder: 'e.g. 4.5' },
            { name: 'reviewsCount', label: 'Reviews Count', placeholder: 'e.g. 25' },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type="number"
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div>
          <label className="font-semibold block mb-2">Ingredients</label>
          {formData.ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ing}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                placeholder={`Ingredient ${idx + 1}`}
                className="border p-2 rounded w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(idx)}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instruction */}
        <div>
          <label className="block font-semibold mb-1">Instruction</label>
          <textarea
            name="instruction"
            value={formData.instruction}
            onChange={handleChange}
            placeholder="Enter preparation instructions..."
            rows={4}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {isUpdating ? 'Updating...' : 'Update Nutrition'}
        </button>
      </form>
    </div>
  );
}
