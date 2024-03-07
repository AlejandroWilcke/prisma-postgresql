enum Roles {
	ADMIN = 'ADMIN',
	EDITOR = 'EDITOR',
	BASIC = 'BASIC'
}

const { ADMIN, EDITOR, BASIC } = Roles

const createReviewsRoles: string[] = [ EDITOR, BASIC ]
const editReviewsRoles: string[] = [ EDITOR ]
const deleteReviewsRoles: string[] = [ EDITOR ]

export function isAbleToCreateReviews(role: string): boolean {
  return createReviewsRoles.includes(role);
}

export function isAbleToEditReviews(role: string): boolean {
	return editReviewsRoles.includes(role);
}

export function isAbleToDeleteReviews(role: string): boolean {
	return deleteReviewsRoles.includes(role);
}

export function isAdmin(role: string): boolean {
	return Roles.ADMIN as string === role;
}