import Point from "./entities/Point";
import Result from "./entities/Result";

export default class NewtonSolver {

    //matrix with values k * i
    private evaluatedPoints: Result[][] = [[]];
    private generalPolynomial = "";

    constructor(private points: Point[], evalPointX: number) {
        this.initAndReset();
        this.solve(evalPointX);
    }

    public initAndReset() {
        //Init for k = 0
        this.evaluatedPoints = [[]];
        this.generalPolynomial = "";
        for(let i = 0; i < this.points.length; i++) {
            this.evaluatedPoints[0][i] = new Result(this.points[i].y, this.points[i].y + "");
        }
    }

    public solve(evalPointX: number) {
        this.initAndReset();
        for(let k = 1; k < this.points.length; k++) {
            this.solveK(evalPointX, k);
        }

        this.constructPolynomial();
    }

    private solveK(evalPointX: number, k: number) {
        const iters = this.points.length - k;

        for (let i = 0; i < iters; i++) {
            const ci1k1 = this.evaluatedPoints[k-1][i+1].result;
            const cik1 = this.evaluatedPoints[k-1][i].result;            
            const xi = this.points[i].x;
            const xik = this.points[i+k].x;
            
            const res = (ci1k1 - cik1) / (xik - xi);
            const resString = "\\frac{(" + ci1k1 + "-" + cik1  + ")}{(" + xik + " - " + xi + ")}";


           

            if (k >= this.evaluatedPoints.length) this.evaluatedPoints.push(new Array<Result>(iters));
            this.evaluatedPoints[k][i] = new Result(res, resString);
        }
    }

    private constructPolynomial() {
        for (let k = 0; k < this.points.length; k++) {
            this.generalPolynomial += this.evaluatedPoints[k][0].result;

            for (let i = 0; i < k; i++) { 
                this.generalPolynomial += " * (x - " + this.points[i].x + ")"; 
            }

            if (k < this.points.length - 1)
                this.generalPolynomial += " + ";
        }

    }

    public getResult(i: number, k: number) {
        if (k >= this.evaluatedPoints.length || i >= this.evaluatedPoints[k].length) return "";

        return this.evaluatedPoints[k][i].result;
    }

    public getResultString(i: number, k: number) {
        if (k >= this.evaluatedPoints.length || i >= this.evaluatedPoints[k].length) return "";
        
        return this.evaluatedPoints[k][i].resultString;
    }

    public getGeneralPolynomial() {
        return this.generalPolynomial;
    }

    public getPolynomial(x: number): [string, number] {
        const p = this.generalPolynomial.replaceAll("x", x + "");
        return [p, eval(p)];
    }
}