// Stat Card Component
export const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="bg-gray-800 rounded-xl p-6 text-center">
    <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);
