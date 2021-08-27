import WebSocket from "ws";
import axios from "axios";
import http from "http";

const ws: WebSocket = new WebSocket(" wss://fstream.binance.com/ws");
const httpEndPoint: string = "https://fapi.binance.com";
const httpKline: string = "/fapi/v1/klines?symbol=btcusdt&interval=5m&limit=100";

const app = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const promise = axios.get(httpEndPoint + httpKline);
        promise.then((response) => {
            const newData = response.data;
            const cdata = newData.map((d: string[]) => {
                const date = new Date(d[0])
                return {
                    "open": date,
                    "high": parseFloat(d[1]),
                    "low": parseFloat(d[2]),
                    "close":parseFloat(d[3]),
                    "quantity":parseFloat(d[4])
                };
            });
            res.end(JSON.stringify(cdata));
        })
    }).listen(5000);