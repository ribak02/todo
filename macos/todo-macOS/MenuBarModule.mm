#import "MenuBarModule.h"
#import "AppDelegate.h"
#import <AppKit/AppKit.h>

@implementation MenuBarModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onTaskToggled"];
}

- (NSStatusItem *)statusItem {
  return ((AppDelegate *)[NSApp delegate]).menuBarItem;
}

RCT_EXPORT_METHOD(setTodayTasks:(NSArray *)tasks
                  done:(nonnull NSNumber *)done
                  total:(nonnull NSNumber *)total) {
  dispatch_async(dispatch_get_main_queue(), ^{
    NSStatusItem *item = [self statusItem];
    if (!item) return;

    item.button.title = [NSString stringWithFormat:@"%@/%@", done, total];

    NSMenu *menu = [[NSMenu alloc] init];

    for (NSDictionary *task in tasks) {
      NSString *taskId    = task[@"id"];
      NSString *taskTitle = task[@"title"];
      BOOL completed      = [task[@"completed"] boolValue];

      NSMenuItem *menuItem = [[NSMenuItem alloc]
          initWithTitle:taskTitle
                 action:@selector(taskItemClicked:)
          keyEquivalent:@""];
      menuItem.state             = completed ? NSControlStateValueOn
                                             : NSControlStateValueOff;
      menuItem.representedObject = taskId;
      menuItem.target            = self;
      [menu addItem:menuItem];
    }

    if (tasks.count > 0) {
      [menu addItem:[NSMenuItem separatorItem]];
    }

    NSMenuItem *quitItem = [[NSMenuItem alloc]
        initWithTitle:@"Quit"
               action:@selector(terminate:)
        keyEquivalent:@"q"];
    [menu addItem:quitItem];

    item.menu = menu;
  });
}

- (void)taskItemClicked:(NSMenuItem *)sender {
  NSString *taskId = sender.representedObject;
  if (taskId) {
    [self sendEventWithName:@"onTaskToggled" body:@{@"id": taskId}];
  }
}

@end
