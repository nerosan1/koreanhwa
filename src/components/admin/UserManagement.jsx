// UserManagement.js
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export function UserManagement() {
  const userData = [
    { name: 'Nguyễn Văn A', role: 'Học viên', status: 'Hoạt động' },
    { name: 'Trần Thị B', role: 'Giảng viên', status: 'Khóa' },
    { name: 'Lê Văn C', role: 'Học viên', status: 'Hoạt động' },
  ];

  const roleDistribution = [
    { role: 'Học viên', value: 2 },
    { role: 'Giảng viên', value: 1 },
    { role: 'Admin phụ', value: 0 },
    { role: 'Cộng tác viên', value: 0 },
  ];

  const newUsersPerMonth = [
    { month: 'Tháng 1', users: 10 },
    { month: 'Tháng 2', users: 15 },
    { month: 'Tháng 3', users: 12 },
    { month: 'Tháng 4', users: 20 },
    { month: 'Tháng 5', users: 18 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Tìm kiếm..." className="border px-3 py-2 rounded-md w-48 focus:ring-2 focus:ring-blue-500" />
        <select className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500">
          <option>Tất cả</option>
          <option>Học viên</option>
          <option>Giảng viên</option>
          <option>Admin phụ</option>
          <option>Cộng tác viên</option>
        </select>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Khóa tài khoản</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Phân quyền</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">Vai trò</th>
              <th className="border px-4 py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Tỷ lệ người dùng theo vai trò</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={roleDistribution} dataKey="value" nameKey="role" cx="50%" cy="50%" outerRadius={100} label>
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Người dùng mới theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={newUsersPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
    