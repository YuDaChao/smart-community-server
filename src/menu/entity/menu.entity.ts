import { Exclude, Expose } from 'class-transformer';

export class MenuEntity {
  id: number;
  @Exclude()
  menuPath: string;
  @Exclude()
  menuName: string;
  @Exclude()
  menuIcon: string;
  @Exclude()
  children: MenuEntity[];

  @Expose()
  get name() {
    return this.menuName;
  }

  @Expose()
  get icon() {
    return this.menuIcon;
  }

  @Expose()
  get path() {
    return this.menuPath;
  }

  @Expose()
  get routes() {
    return this.children;
  }

  constructor(partial: Record<string, any>) {
    Object.assign(this, partial);
  }
}
