// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

type userLogin = boolean;
declare namespace App {
	
	// interface Error {}
	interface Locals {
		userLogin: userLogin,

	}
	// interface PageData {}
	// interface Platform {}
}
