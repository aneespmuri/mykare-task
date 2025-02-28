import React from 'react';
import { View } from 'react-native';

interface SeparatorProps {
    height?: number;
    width?: number;
}

const Separator = ({ height = 0, width = 0 }: SeparatorProps) => (
    <View style={{ height, width }} />
);

export default Separator;