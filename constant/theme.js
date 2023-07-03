import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#85586F',
    
    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "#FFE5F1"
}


export const SIZES = {
    base: 10,
    width,
    height
}