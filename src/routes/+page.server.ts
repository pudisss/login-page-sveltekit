import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = ({ locals, cookies }) => {
    const userLogin = cookies.get("userLogin");

    if (userLogin == undefined) {
        throw redirect(303, "/login");
    }

}