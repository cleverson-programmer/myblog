import UserTable from "@/components/users/userTable";
import { Header } from "@/components/home/nav/Header";
import AdminRoute from "@/validations/adminRoute";

export default function ViewUsers() {
  return (
    <div className="p-4">
      <AdminRoute>
        <Header />
        <UserTable />
      </AdminRoute>
    </div>
  );
}
