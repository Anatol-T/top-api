import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { index, prop } from '@typegoose/typegoose'

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @prop()
  count: number
  @prop()
  juniorSalary: number
  @prop()
  middleSalary: number
  @prop()
  seniorSalary: number

  @prop()
  updatedAt: Date
}
export class TopPageAdvantage {
  @prop()
  title: string
  @prop()
  description: string
}

export interface TopPageModel extends Base {}
//@index({ title: 'text', seoText: 'text' })
@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
  //@prop({ enum: TopLevelCategory, type: () => Number })
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory
  @prop()
  secondCategory: string
  @prop({ unique: true })
  alias: string
  //@prop({ text: true})
  @prop()
  title: string
  @prop()
  category: string
  @prop({ type: () => HhData })
  hh?: HhData
  @prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[]
  @prop()
  seoText: string
  @prop()
  tagsTitle: string
  @prop({ type: () => [String] })
  tags: string[]
}
