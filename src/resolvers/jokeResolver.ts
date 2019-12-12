import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx
} from "type-graphql";
import { isAuth } from "../helpers/isAuth";
import axios, { AxiosResponse } from "axios";
import { MyContext } from "../helpers/MyContext";

@ObjectType({ description: "Object representing Joke" })
class Joke {
  @Field()
  id!: string;

  @Field()
  value!: string;

  @Field()
  url!: string;

  @Field()
  icon_url!: string;

  @Field(type => [String])
  categories!: [string];
}

@Resolver(of => Joke)
export class JokeResolver {
  @Query(returns => [String])
  // @UseMiddleware(isAuth)
  async categories(@Ctx() { payload }: MyContext) {
    const response: AxiosResponse = await axios.get(
      "https://api.chucknorris.io/jokes/categories"
    );
    return response.data;
  }

  @Query(returns => Joke)
  // @UseMiddleware(isAuth)
  async joke(
    @Ctx() { payload }: MyContext,
    @Arg("category") category: string
  ) {
    const response: AxiosResponse = await axios.get(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
    return response.data;
  }
}