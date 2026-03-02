#import "MenuBarModule.h"
#import <AppKit/AppKit.h>

@interface MenuBarModule ()
@property (nonatomic, strong) NSStatusItem *statusItem;
@end

@implementation MenuBarModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (instancetype)init {
  if (self = [super init]) {
    dispatch_async(dispatch_get_main_queue(), ^{
      self.statusItem = [[NSStatusBar systemStatusBar]
          statusItemWithLength:NSVariableStatusItemLength];
      self.statusItem.button.title = @"0/0";
    });
  }
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onTaskToggled"];
}

RCT_EXPORT_METHOD(setTodayTasks:(NSArray *)tasks
                  done:(nonnull NSNumber *)done
                  total:(nonnull NSNumber *)total) {
  dispatch_async(dispatch_get_main_queue(), ^{
    self.statusItem.button.title =
        [NSString stringWithFormat:@"%@/%@", done, total];

    NSMenu *menu = [[NSMenu alloc] init];

    for (NSDictionary *task in tasks) {
      NSString *taskId    = task[@"id"];
      NSString *taskTitle = task[@"title"];
      BOOL completed      = [task[@"completed"] boolValue];

      NSMenuItem *item = [[NSMenuItem alloc]
          initWithTitle:taskTitle
                 action:@selector(taskItemClicked:)
          keyEquivalent:@""];
      item.state             = completed ? NSControlStateValueOn
                                         : NSControlStateValueOff;
      item.representedObject = taskId;
      item.target            = self;
      [menu addItem:item];
    }

    if (tasks.count > 0) {
      [menu addItem:[NSMenuItem separatorItem]];
    }

    NSMenuItem *quitItem = [[NSMenuItem alloc]
        initWithTitle:@"Quit"
               action:@selector(terminate:)
        keyEquivalent:@"q"];
    [menu addItem:quitItem];

    self.statusItem.menu = menu;
  });
}

- (void)taskItemClicked:(NSMenuItem *)sender {
  NSString *taskId = sender.representedObject;
  if (taskId) {
    [self sendEventWithName:@"onTaskToggled" body:@{@"id": taskId}];
  }
}

@end
