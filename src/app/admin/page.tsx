'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const [description, setDescription] = useState('');
  const [contains, setContains] = useState('');
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [price, setPrice] = useState<number | ''>('');

  const router = useRouter();

  const userRole = 'admin'; // Replace with actual role-checking logic

  if (userRole !== 'admin') {
    return <div>Access Denied</div>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const mockApiCall = async (formData: FormData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock API Call:', {
          description: formData.get('description'),
          contains: formData.get('contains'),
          notes: formData.get('notes'),
          price: formData.get('price'),
          images: formData.getAll('images'), // multiple
        });
        resolve('success');
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !contains || !notes || !images || !price) {
      alert('Please fill all fields and upload images.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('contains', contains);
    formData.append('notes', notes);
    formData.append('price', price.toString());

    if (images) {
      Array.from(images).forEach((file) => {
        formData.append('images', file);
      });
    }

    try {
      await mockApiCall(formData);
      alert('Product added successfully!');
      setDescription('');
      setContains('');
      setNotes('');
      setPrice('');
      setImages(null);
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Contains */}
        <div>
          <label className="block text-sm font-medium mb-2">Contains</label>
          <textarea
            value={contains}
            onChange={(e) => setContains(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : '')}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
