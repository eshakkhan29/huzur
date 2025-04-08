interface Person {
  id: number;
  name: string;
  age: number;
  phone: string;
  gender: string;
  children: { id: number }[];
}

export function buildNestedChildren(data: Person[] = []) {
  if (!Array.isArray(data)) {
    throw new Error("Expected an array of users");
  }

  // Create a map of users by ID for easy lookup
  const userMap = new Map<number, Person & { children: any[] }>();
  data.forEach((user) => {
    userMap.set(user.id, { ...user, children: [] });
  });

  // Assign nested children
  data.forEach((user) => {
    user.children?.forEach((child) => {
      const fullChild = userMap.get(child.id);
      if (fullChild) {
        userMap.get(user.id)?.children.push(fullChild);
      }
    });
  });

  // Find root users (who are not listed as anyone's child)
  const childIds = new Set(
    data.flatMap((u) => u.children?.map((c) => c.id) || [])
  );
  const roots = data
    .filter((u) => !childIds.has(u.id))
    .map((u) => userMap.get(u.id)!);

  return roots;
}

export default buildNestedChildren;
