import { prop, Ref, modelOptions, getModelForClass } from "@typegoose/typegoose";
import { User } from "./user.models";

@modelOptions({
  schemaOptions:{
    timestamps: true
  }
})
export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;
}

const SessionModel = getModelForClass(Session /*I can put the schema options object here as an argument as well*/);

export default SessionModel;
