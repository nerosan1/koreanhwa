// ForumManagement.js
import { useState } from 'react';

export function ForumManagement() {
  const [pendingPosts, setPendingPosts] = useState([
    { id: 1, title: 'Cách học từ vựng hiệu quả', author: 'Nguyễn Văn A', date: '2025-08-01', content: 'Mình thường học từ vựng bằng cách tạo flashcard và ôn tập mỗi ngày.' },
    { id: 2, title: 'Kinh nghiệm thi TOPIK II', author: 'Trần Thị B', date: '2025-08-02', content: 'Thi TOPIK II cần luyện đề thật nhiều và chú ý kỹ phần nghe.' },
    { id: 3, title: 'Chia sẻ tài liệu N5', author: 'Lê Văn C', date: '2025-08-03', content: 'Mình có tài liệu N5 PDF, mọi người cần thì mình gửi link.' },
  ]);

  const handleApprove = (id) => {
    alert(`Duyệt bài viết ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Xóa bài viết ID: ${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý diễn đàn</h2>

      {/* Bảng danh sách bài viết chờ duyệt */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tiêu đề</th>
              <th className="border px-4 py-2">Tác giả</th>
              <th className="border px-4 py-2">Ngày đăng</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {pendingPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{post.id}</td>
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2">{post.author}</td>
                <td className="border px-4 py-2">{post.date}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleApprove(post.id)} className="text-green-500 hover:underline mr-2">Duyệt</button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chi tiết bài viết */}
      <div className="grid gap-6">
        {pendingPosts.map((post) => (
          <div key={post.id} className="border border-gray-300 rounded-lg p-4 shadow bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Tác giả: {post.author}</p>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex gap-3">
              <button onClick={() => handleApprove(post.id)} className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">Duyệt</button>
              <button onClick={() => handleDelete(post.id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {/* Quản lý nhóm chủ đề */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Quản lý nhóm chủ đề</h3>
        <div className="border border-gray-300 rounded-lg p-4 text-gray-500">
          [Danh sách nhóm chủ đề (Học tập, Thi cử, Kinh nghiệm, ...)]
        </div>
      </div>
    </div>
  );
}
