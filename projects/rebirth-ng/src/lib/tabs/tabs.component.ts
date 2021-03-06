import {
  Component,
  QueryList,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  AfterContentInit
} from '@angular/core';
import { TabComponent } from './tab.component';
import { RebirthNGConfig } from '../rebirth-ng.config';

@Component({
  selector: 're-tabs',
  templateUrl: './tabs.component.html',
  exportAs: 'tabs'
})
export class TabsComponent implements AfterContentInit {
  @Input() type: 'tabs' | 'pills' = 'tabs';
  @Input() activeTab: number | string;
  @Input() vertical: boolean;
  @Input() justified: boolean;
  @Input() cssClass: string;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() activeTabChange = new EventEmitter<number | string>();

  constructor(rebirthNGConfig: RebirthNGConfig) {
    this.type = <any>rebirthNGConfig.tabs.type;
    this.justified = rebirthNGConfig.tabs.justified;
    this.vertical = rebirthNGConfig.tabs.vertical;
  }

  ngAfterContentInit(): void {
    if (!this.activeTab && this.tabs.length) {
      this.select(this.tabs.first.id);
    }
  }

  select(id: number | string) {
    const tab = this.tabs.find(item => item.id === id);
    if (tab && !tab.disabled) {
      this.activeTab = id;
      this.activeTabChange.emit(id);
    }
  }

}
