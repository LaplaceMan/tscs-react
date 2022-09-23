export const TimeRemainPercentage = (deadline: number, duration: number):number => {
    return (deadline - new Date().getTime()/1000)/duration * 100
}
