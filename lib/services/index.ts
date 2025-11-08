// Export services (avoiding User type conflict)
export { authService } from "./auth.service";
export type { User } from "./auth.service";
export { cvService } from "./cv.service";
export type { CV } from "./cv.service";
export { interviewService } from "./interview.service";
export type { Interview } from "./interview.service";
export { trainingService } from "./training.service";
export type { Challenge, TrainingProgress } from "./training.service";
export { userService } from "./user.service";
