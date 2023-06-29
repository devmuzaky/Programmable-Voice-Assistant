import {Parameter} from "./parameter";
import {Pattern} from "./pattern";

export interface MarketPlaceCommandDTO {
  id: number;
  name: string;
  description: string;
  owner: string;
  parameters: Parameter[];
  patterns: Pattern[];
  used_by_count: number;
  icon_link: string;
}
