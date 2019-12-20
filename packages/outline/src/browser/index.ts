import * as React from 'react';
import { Provider, Injectable, Autowired } from '@ali/common-di';
import { BrowserModule, ComponentContribution, Domain, ComponentRegistry, localize, TabBarToolbarContribution, ToolbarRegistry, CommandContribution, CommandRegistry, IContextKeyService } from '@ali/ide-core-browser';
import { OutLineTree } from './outline.tree.view';
import { ExplorerContainerId } from '@ali/ide-explorer/lib/browser/explorer-contribution';
import { MainLayoutContribution, IMainLayoutService } from '@ali/ide-main-layout';
import { OutLineService, OutlineSortOrder } from './outline.service';
import { getIcon, ROTATE_TYPE } from '@ali/ide-core-browser';

export const OUTLINE_COLLAPSE_ALL = 'outline.collapse.all';
export const OUTLINE_FOLLOW_CURSOR = 'outline.follow.cursor';
export const OUTLINE_SORT_KIND = 'outline.sort.kind';
export const OUTLINE_SORT_NAME = 'outline.sort.name';
export const OUTLINE_SORT_POSITION = 'outline.sort.position';

@Injectable()
export class OutlineModule extends BrowserModule {
  providers: Provider[] = [
    OutlineContribution,
  ];

  component = OutLineTree;
}

@Domain(MainLayoutContribution, TabBarToolbarContribution, CommandContribution)
export class OutlineContribution implements MainLayoutContribution, TabBarToolbarContribution, CommandContribution {
  @Autowired(IMainLayoutService)
  mainLayoutService: IMainLayoutService;

  @Autowired()
  outlineService: OutLineService;

  @Autowired(IContextKeyService)
  contextKey: IContextKeyService;

  onDidRender() {
    this.mainLayoutService.collectViewComponent({
      component: OutLineTree,
      collapsed: true,
      id: 'outline-view',
      name: localize('outline.title'),
    }, ExplorerContainerId);
  }

  registerCommands(registry: CommandRegistry) {
    registry.registerCommand({
      id: OUTLINE_COLLAPSE_ALL,
      iconClass: getIcon('collapse-all'),
      label: localize('outline.collapse.all', '全部折叠'),
    }, {
      execute: () => {
        this.outlineService.collapseAll();
      },
    });
    registry.registerCommand({
      id: OUTLINE_FOLLOW_CURSOR,
      iconClass: getIcon('follow-cursor'),
      toogleIconClass: getIcon('follow-cursor', { fill: true }),
      label: localize('outline.follow.cursor', '跟随光标'),
    }, {
      execute: () => {
        this.outlineService.followCursor = !this.outlineService.followCursor;
        this.contextKey.createKey('followCursor', this.outlineService.followCursor);
      },
    });
    registry.registerCommand({
      id: OUTLINE_SORT_KIND,
      label: localize('outline.sort.kind', '排序依据:类别'),
    }, {
      execute: () => {
        this.outlineService.sortType = OutlineSortOrder.ByKind;
      },
    });
    registry.registerCommand({
      id: OUTLINE_SORT_NAME,
      label: localize('outline.sort.name', '排序依据:名称'),
    }, {
      execute: () => {
        this.outlineService.sortType = OutlineSortOrder.ByName;
      },
    });
    registry.registerCommand({
      id: OUTLINE_SORT_POSITION,
      label: localize('outline.sort.position', '排序依据:位置'),
    }, {
      execute: () => {
        this.outlineService.sortType = OutlineSortOrder.ByPosition;
      },
    });
  }

  registerToolbarItems(registry: ToolbarRegistry) {
    registry.registerItem({
      id: 'outline.action.follow.cursor',
      viewId: 'outline-view',
      command: OUTLINE_FOLLOW_CURSOR,
      label: localize('outline.follow.cursor', '跟随光标'),
      toggleWhen: 'followCursor',
    });
    registry.registerItem({
      id: 'outline.action.collapse.all',
      viewId: 'outline-view',
      command: OUTLINE_COLLAPSE_ALL,
      label: localize('outline.collapse.all', '全部折叠'),
    });
    registry.registerItem({
      id: 'outline.menu.sort.kind',
      viewId: 'outline-view',
      command: OUTLINE_SORT_KIND,
      group: 'inline',
      toggleWhen: 'outlineSortType == 2',
    });
    registry.registerItem({
      id: 'outline.menu.sort.name',
      viewId: 'outline-view',
      command: OUTLINE_SORT_NAME,
      group: 'inline',
      toggleWhen: 'outlineSortType == 1',
    });
    registry.registerItem({
      id: 'outline.menu.sort.position',
      viewId: 'outline-view',
      command: OUTLINE_SORT_POSITION,
      group: 'inline',
      toggleWhen: 'outlineSortType == 0',
    });
  }

}
