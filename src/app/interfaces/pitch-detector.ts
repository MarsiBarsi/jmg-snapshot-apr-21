export interface PitchDetector {
    do(buffer: Float32Array | number[]): number;
}
