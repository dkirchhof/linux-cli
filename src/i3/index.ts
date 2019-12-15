import { getWorkspaces, resetWorkspaceName, getFocusedWorkspace, setWorkspaceName } from "./utils";

export default async function run(args: string[]) {
    switch (args[0]) {
        case "rename-workspace":
            renameWorkspace(args[1]);
            break;
        case "reset-workspaces":
            resetWorkspaces();
            break;
    }
}

async function renameWorkspace(name: string) {
    if (!name || !name.trim().length) {
        throw new Error("name is missing");
    }

    const workspaces = await getWorkspaces();
    const focusedWorkspace = getFocusedWorkspace(workspaces);

    setWorkspaceName(focusedWorkspace, name);
}

async function resetWorkspaces() {
    const workspaces = await getWorkspaces();

    workspaces.forEach(
        workspace => resetWorkspaceName(workspace)
    );
}
