"use client";

import {ServerWithMembersWithProfiles} from "@/types";
import {ChannelType, MemberRole} from "@prisma/client";
import {ToolTip} from "../Tooltip";
import {Plus, Settings} from "lucide-react";
import {useModal} from "@/hooks/useModelStore";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export default function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const {onOpen} = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ToolTip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel")}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ToolTip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ToolTip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", {server})}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ToolTip>
      )}
    </div>
  );
}