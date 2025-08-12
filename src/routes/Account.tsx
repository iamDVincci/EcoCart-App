import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Dashboard: React.FC = () => <div className="p-4">Account dashboard placeholder.</div>;
const Orders: React.FC = () => <div className="p-4">Order history placeholder.</div>;
const Sustainability: React.FC = () => <div className="p-4">Personal sustainability metrics placeholder.</div>;

const Account: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <aside className="w-full md:w-64">
          <nav className="space-y-2" aria-label="Account navigation">
            <Link to="." className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-emerald-50">Dashboard</Link>
            <Link to="orders" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-emerald-50">Orders</Link>
            <Link to="sustainability" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-emerald-50">Sustainability</Link>
          </nav>
        </aside>
        <div className="flex-1 rounded-lg border bg-white shadow-sm">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sustainability" element={<Sustainability />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Account;
