import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default async function Documents() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="on-site">On site</SelectItem>
          <SelectItem value="remote">Remote</SelectItem>
          <SelectItem value="hybrid">Hybrid</SelectItem>
        </SelectContent>
      </Select>
    </div>);
}
