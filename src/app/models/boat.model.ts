export type BoatArgs = {
  hp: string;
  people: string;
  length: string;
  imgs: string[];
  title: string;
  bed?:boolean;
};

export class Boat {
    public hp: string = ""
    public people: string = ""
    public length: string = ""
    public imgs: string[] = []
    public title: string = ""
    public bed:boolean = false;
  constructor(args:BoatArgs) {
    this.hp = args.hp;
    this.people = args.people;
    this.length = args.length;
    this.imgs = args.imgs;
    this.title = args.title;
    this.bed = args.bed?args.bed:false;
  }
}
