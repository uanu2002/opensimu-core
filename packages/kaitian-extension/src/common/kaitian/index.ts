import { createMainContextProxyIdentifier, createExtHostContextProxyIdentifier } from '@ali/ide-connection';
import { IMainThreadLifeCycle, IExtHostLifeCycle } from './lifecycle';
import { IExtHostTheme, IMainThreadTheme } from './theme';
import { IMainThreadLayout, IExtHostLayout } from './layout';
import { IMainThreadCommon, IExtHostCommon } from './common';
import { IMainThreadToolbar } from './toolbar';
import { IExtHostIDEWindow, IMainThreadIDEWindow } from './window';

export const MainThreadKaitianAPIIdentifier = {
  MainThreadLifecycle: createMainContextProxyIdentifier<IMainThreadLifeCycle>('MainThreadLifeCycle'),
  MainThreadTheme: createMainContextProxyIdentifier<IMainThreadTheme>('MainThreadTheme'),
  MainThreadLayout: createMainContextProxyIdentifier<IMainThreadLayout>('MainThreadLayout'),
  MainThreadCommon: createMainContextProxyIdentifier<IMainThreadCommon>('MainThreadCommon'),
  MainThreadToolbar: createMainContextProxyIdentifier<IMainThreadToolbar>('MainThreadToolbar'),
  MainThreadIDEWindow: createMainContextProxyIdentifier<IMainThreadIDEWindow>('MainThreadIDEWindow'),
};

export const ExtHostKaitianAPIIdentifier = {
  ExtHostLifeCycle: createExtHostContextProxyIdentifier<IExtHostLifeCycle>('ExtHostLifeCycle'),
  ExtHostLayout: createExtHostContextProxyIdentifier<IExtHostLayout>('ExtHostLayout'),
  ExtHostTheme: createExtHostContextProxyIdentifier<IExtHostTheme>('ExtHostTheme'),
  ExtHostCommon: createExtHostContextProxyIdentifier<IExtHostCommon>('ExtHostCommon'),
  ExtHostToolbar: createExtHostContextProxyIdentifier('ExtHostToolbar'),
  ExtHostIDEWindow: createExtHostContextProxyIdentifier<IExtHostIDEWindow>('ExtHostIDEWindow'),
};
