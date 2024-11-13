import { db } from '@vercel/postgres';
import { Redis } from '@upstash/redis';
import { arrayBufferToBase64, stringToArrayBuffer } from "../lib/base64";

export const config = {
    runtime: 'edge',
};

const redis = Redis.fromEnv();

export default async function handler(request) {
    try {
        const { username, email, password } = await request.json();
        const client = await db.connect();

        // Vérification de l'existence de l'utilisateur
        const { rowCount, rows } = await client.sql`select * from users where username = ${username} or email = ${email}`;
        if (rowCount !== 0) {
            const error = { code: "UNAUTHORIZED", message: "Utilisateur déjà existant !" };
            return new Response(JSON.stringify(error), {
                status: 401,
                headers: { 'content-type': 'application/json' },
            });
        } else {
            // Hash du mot de passe
            const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(username + password));
            const hashed64 = arrayBufferToBase64(hash);
            const external_id = crypto.randomUUID();

            // Insertion de l'utilisateur
            await client.sql`insert into users (username, password, email, created_on, external_id) values (${username}, ${hashed64}, ${email}, now(), ${external_id})`;
        }
        
        // Libérer la connexion
        await client.release();

        // Backend (handler) après l'insertion réussie
        return new Response(JSON.stringify({ message: "Inscription réussie" }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Erreur serveur" }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
