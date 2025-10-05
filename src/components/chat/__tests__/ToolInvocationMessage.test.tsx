import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationMessage } from "../ToolInvocationMessage";

afterEach(() => {
  cleanup();
});

describe("ToolInvocationMessage", () => {
  describe("str_replace_editor tool", () => {
    it("displays creating message for create command in progress", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/App.jsx" },
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByText("Creating App.jsx")).toBeDefined();
    });

    it("displays created message for create command completed", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/components/Button.tsx" },
            state: "result",
          }}
        />
      );

      expect(screen.getByText("Created Button.tsx")).toBeDefined();
    });

    it("displays editing message for str_replace command in progress", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "str_replace", path: "/App.jsx" },
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByText("Editing App.jsx")).toBeDefined();
    });

    it("displays edited message for str_replace command completed", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "str_replace", path: "/utils/helpers.ts" },
            state: "result",
          }}
        />
      );

      expect(screen.getByText("Edited helpers.ts")).toBeDefined();
    });

    it("displays updating message for insert command in progress", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "insert", path: "/App.jsx" },
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByText("Updating App.jsx")).toBeDefined();
    });

    it("displays updated message for insert command completed", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "insert", path: "/components/Form.tsx" },
            state: "result",
          }}
        />
      );

      expect(screen.getByText("Updated Form.tsx")).toBeDefined();
    });

    it("displays viewing message for view command in progress", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "view", path: "/App.jsx" },
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByText("Viewing App.jsx")).toBeDefined();
    });

    it("displays viewed message for view command completed", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "view", path: "/config.json" },
            state: "result",
          }}
        />
      );

      expect(screen.getByText("Viewed config.json")).toBeDefined();
    });

    it("extracts filename from nested path", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/src/components/ui/Button.tsx" },
            state: "result",
          }}
        />
      );

      expect(screen.getByText("Created Button.tsx")).toBeDefined();
    });
  });

  describe("file_manager tool", () => {
    it("displays renaming message for rename command in progress", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "file_manager",
            args: {
              command: "rename",
              path: "/App.jsx",
              new_path: "/Main.jsx",
            },
            state: "partial-call",
          }}
        />
      );

      expect(
        screen.getByText("Renaming App.jsx to Main.jsx")
      ).toBeDefined();
    });

    it("displays renamed message for rename command completed", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "file_manager",
            args: {
              command: "rename",
              path: "/Button.tsx",
              new_path: "/MyButton.tsx",
            },
            state: "result",
          }}
        />
      );

      expect(
        screen.getByText("Renamed Button.tsx to MyButton.tsx")
      ).toBeDefined();
    });

    it("displays deleting message for delete command in progress", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "file_manager",
            args: { command: "delete", path: "/OldFile.jsx" },
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByText("Deleting OldFile.jsx")).toBeDefined();
    });

    it("displays deleted message for delete command completed", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "file_manager",
            args: { command: "delete", path: "/components/Unused.tsx" },
            state: "result",
          }}
        />
      );

      expect(screen.getByText("Deleted Unused.tsx")).toBeDefined();
    });
  });

  describe("unknown tools", () => {
    it("displays generic message for unknown tool in progress", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "custom_tool",
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByText("Running custom_tool")).toBeDefined();
    });

    it("displays generic completed message for unknown tool", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "custom_tool",
            state: "result",
          }}
        />
      );

      expect(screen.getByText("custom_tool completed")).toBeDefined();
    });
  });

  describe("visual indicators", () => {
    it("shows spinner for in-progress tools", () => {
      const { container } = render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/App.jsx" },
            state: "partial-call",
          }}
        />
      );

      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeDefined();
    });

    it("shows success indicator for completed tools", () => {
      const { container } = render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/App.jsx" },
            state: "result",
          }}
        />
      );

      const successIndicator = container.querySelector(".bg-emerald-500");
      expect(successIndicator).toBeDefined();
    });
  });

  describe("edge cases", () => {
    it("handles missing path gracefully", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create" },
            state: "result",
          }}
        />
      );

      expect(screen.getByText("Created undefined")).toBeDefined();
    });

    it("handles missing args gracefully", () => {
      render(
        <ToolInvocationMessage
          toolInvocation={{
            toolName: "str_replace_editor",
            state: "result",
          }}
        />
      );

      expect(
        screen.getByText("str_replace_editor completed")
      ).toBeDefined();
    });
  });
});
