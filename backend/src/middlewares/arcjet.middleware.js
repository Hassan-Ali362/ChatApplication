import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too Many Requests: Rate limit exceeded. Please try again later." });
            }
            else if(decision.reason.isBot()) {
                return res.status(403).json({ message: "Forbidden: Bot access denied" });
            }
            else{
                return res.status(403).json({ message: "Forbidden: Request blocked by Arcjet. Access blocked by security policy." });
            }
        }

        if(decision.results?.some(isSpoofedBot)) {
            return res.status(403).json({ error: "Spoofed bot detected", message: "Forbidden: Malicious bot Activity detected" });
        }
        next();
    }
    catch (error) {
        console.error("Arcjet Middleware Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};