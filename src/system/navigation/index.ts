/** Public boundary for the navigation module. */
export {
  NavigationProvider,
  useNavigation,
  type NavigationController,
} from './navigation';
export {
  WORKSPACES,
  resolveWorkspace,
  resolveWorkspaceByIndex,
  nextWorkspace,
  previousWorkspace,
  type WorkspaceDefinition,
  type WorkspaceId,
} from './workspaces';
