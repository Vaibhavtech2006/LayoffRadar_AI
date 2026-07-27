const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "User",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@gmail.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Neha Patel",
    email: "neha@gmail.com",
    role: "User",
    status: "Active",
  },
];

const UsersTable = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Registered Users
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-800 hover:bg-slate-800"
              >
                <td className="py-3">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;