import {Client, Message} from "discord.js";

export interface runEvent {
    message: Message,
    client: Client,
    args: string[]
}

export interface covidData {
    newPositive: string,
    newRecover: string,
    currCases: string,
    totalCases: string,
    retrieved: string
}