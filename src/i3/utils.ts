import { exec } from "../common/cp";
import { IWorkspace } from "./IWorkspace";

export async function getWorkspaces() {
    const response = await exec(`i3-msg -t get_workspaces`);

    return JSON.parse(response) as IWorkspace[];
}

export function getFocusedWorkspace(workspaces: IWorkspace[]) {
    return workspaces.find(workspace => workspace.focused)!;
}

export function setWorkspaceName(workspace: IWorkspace, name: string) {
    return exec(`i3-msg 'rename workspace to "${workspace.num}: ${name}"'`);
}

export async function resetWorkspaceName(workspace: IWorkspace) {
    return exec(`i3-msg 'rename workspace "${workspace.name}" to ${workspace.num}'`);
}
