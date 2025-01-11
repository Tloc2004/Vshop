import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { RoleSelector, AgentGrid } from "~/components/GalleryAgent";
import useCombat from "~/components/Combat";

const ROLES = [
    { id: "Duelist", name: "Duelist", icon: require("../../assets/images/Duelist.png") },
    { id: "Controller", name: "Controller", icon: require("../../assets/images/Controller.png") },
    { id: "Initiator", name: "Initiator", icon: require("../../assets/images/Initiator.png") },
    { id: "Sentinel", name: "Sentinel", icon: require("../../assets/images/Sentinel.png") },
];

const combat = () => {
    const {
        filterByRole,
        handleAgentPress,
        handleAgentSelect,
        handleCancel,
        filteredAgents,
        selectedRole,
    } = useCombat();

    return (
        <View style={styles.container}>
            <RoleSelector
                roles={ROLES}
                selectedRole={selectedRole}
                onRoleSelect={filterByRole}
            />
            <AgentGrid agents={filteredAgents} onAgentPress={handleAgentPress} />
            <View style={styles.buttonContainer}>
                <View style={[styles.buttonWrapper, styles.cancelButton]}>
                    <Button
                        title="Hủy"
                        color="#dc3545"
                        onPress={handleCancel}
                    />
                </View>
                <View style={[styles.buttonWrapper, styles.chooseButton]}>
                    <Button
                        title="Chọn"
                        color="#28a745"
                        onPress={handleAgentSelect}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        paddingTop: 20,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    chooseButton: {
        backgroundColor: "#28a745",
    },
    cancelButton: {
        backgroundColor: "#dc3545",
    },
});

export default combat;
