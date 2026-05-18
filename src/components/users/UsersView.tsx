import { User } from "@/src/types/user";

type Props = {
  users: User[];
};

export default function UsersView({ users }: Props) {
  return (
    <div>
      <h1>User一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
