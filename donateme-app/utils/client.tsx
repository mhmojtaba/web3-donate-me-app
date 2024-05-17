import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;

export const client = createThirdwebClient({
	clientId: clientId,
});
