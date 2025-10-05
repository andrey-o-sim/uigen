"use client";

import { Loader2 } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  args?: {
    command?: string;
    path?: string;
    new_path?: string;
  };
  state: "result" | "error" | "partial-call";
  result?: any;
}

interface ToolInvocationMessageProps {
  toolInvocation: ToolInvocation;
}

function getToolMessage(toolInvocation: ToolInvocation): string {
  const { toolName, args, state } = toolInvocation;

  if (toolName === "str_replace_editor" && args) {
    const { command, path } = args;
    const fileName = path?.split("/").pop() || path;

    switch (command) {
      case "create":
        return state === "result"
          ? `Created ${fileName}`
          : `Creating ${fileName}`;
      case "str_replace":
        return state === "result"
          ? `Edited ${fileName}`
          : `Editing ${fileName}`;
      case "insert":
        return state === "result"
          ? `Updated ${fileName}`
          : `Updating ${fileName}`;
      case "view":
        return state === "result"
          ? `Viewed ${fileName}`
          : `Viewing ${fileName}`;
      default:
        return state === "result"
          ? `Modified ${fileName}`
          : `Modifying ${fileName}`;
    }
  }

  if (toolName === "file_manager" && args) {
    const { command, path, new_path } = args;
    const fileName = path?.split("/").pop() || path;
    const newFileName = new_path?.split("/").pop() || new_path;

    switch (command) {
      case "rename":
        return state === "result"
          ? `Renamed ${fileName} to ${newFileName}`
          : `Renaming ${fileName} to ${newFileName}`;
      case "delete":
        return state === "result"
          ? `Deleted ${fileName}`
          : `Deleting ${fileName}`;
      default:
        return state === "result"
          ? `Modified ${fileName}`
          : `Modifying ${fileName}`;
    }
  }

  // Fallback for unknown tools
  return state === "result"
    ? `${toolName} completed`
    : `Running ${toolName}`;
}

export function ToolInvocationMessage({
  toolInvocation,
}: ToolInvocationMessageProps) {
  const message = getToolMessage(toolInvocation);
  const isComplete = toolInvocation.state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isComplete ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{message}</span>
    </div>
  );
}
