/**
 * As defined by https://www.rfc-editor.org/rfc/rfc7807
 */
export interface ProblemDetails {
    /** url to the problem type */
    type?: string;
    /** short generic human readable message */
    title?: string;
    /** http status code */
    status?: string;
    /** detailed specific human readable message */
    detail?: string;
    /** path to the rest endpoint where the problem occurred */
    instance?: string;
    /**
     * further problem type specific details
     * probably for machine interpretation
     */
    [Extension: string]: any;
}

/**
 * Useful for frontend parts that interact with a REST API
 * to give the result on success but also give the problem
 * details if a specified error occurred.
 * @template T type of the success result 
 */
export interface SuccessOrFailure<T> {
    /** set to result on success */
    success?: T;
    /** only set if success is not set */
    error?: ProblemDetails;
}