import { MenusState } from './menus';

export * from './menus-state.service';

export interface State {
    menus: MenusState;
}
