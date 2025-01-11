import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { getAgent } from "~/utils/valorant-assets";

const { width } = Dimensions.get("window");
const BOX_SIZE = width / 5 - 10; // Kích thước mỗi ô agent (5 cột)

const ROLES = [
    { id: "duelist", name: "Duelist", icon: require("../../assets/images/Duelist.png") },
    { id: "controller", name: "Controller", icon: require("../../assets/images/Controller.png") },
    { id: "initiator", name: "Initiator", icon: require("../../assets/images/Initiator.png") },
    { id: "sentinel", name: "Sentinel", icon: require("../../assets/images/Sentinel.png") },
];

function Agent() {
    const { t } = useTranslation(); // Kết nối với `useTranslation`
    const [agents, setAgents] = useState<ValorantAgent[]>([]); // Lưu danh sách tất cả agents
    const [filteredAgents, setFilteredAgents] = useState<ValorantAgent[]>([]); // Lưu agents đã lọc
    const [selectedRole, setSelectedRole] = useState<string | null>(null); // Nhóm được chọn

    useEffect(() => {
        async function fetchAgents() {
            try {
                const data = await getAgent(); // Gọi hàm getAgent
                if (data && data.agents) { // Kiểm tra dữ liệu trả về từ getAgent
                    setAgents(data.agents); // Lưu tất cả agents
                } else {
                    console.error("Data from getAgent is null or undefined");
                }
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        }
        fetchAgents();
    }, []);

    // Lọc agents theo nhóm
    const filterByRole = (role: string) => {
        if (role === selectedRole) {
            // Nếu ấn lại cùng nhóm, hiển thị tất cả
            setSelectedRole(null);
        } else {
            setSelectedRole(role);
            const filtered = agents.filter((agent) => agent.role?.displayName === role); // Thêm `?.` để tránh lỗi khi `role` hoặc `displayName` là `null`
            setFilteredAgents(filtered);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("agents")}</Text> {/* Sử dụng `useTranslation` để dịch tiêu đề */}

            {/* Menu nhóm */}
            <View style={styles.roleContainer}>
                {ROLES.map((role) => (
                    <TouchableOpacity
                        key={role.id}
                        style={[
                            styles.roleButton,
                            selectedRole === role.id && styles.selectedRoleButton, // Đổi màu khi chọn
                        ]}
                        onPress={() => filterByRole(role.id)}
                    >
                        <Image source={role.icon} style={styles.roleIcon} />
                        <Text style={styles.roleText}>{t(role.name)}</Text> {/* Sử dụng `useTranslation` để dịch tên nhóm */}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Lưới hiển thị Agents */}
            <FlatList
                data={filteredAgents}
                keyExtractor={(item) => item.uuid}
                numColumns={5} // Số cột trong lưới
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.box}>
                        <Image source={{ uri: item.displayIcon }} style={styles.icon} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        paddingTop: 20,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    roleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        width: "100%",
    },
    roleButton: {
        alignItems: "center",
        marginHorizontal: 10,
    },
    selectedRoleButton: {
        borderBottomWidth: 2,
        borderBottomColor: "#ff4655", // Màu đỏ khi chọn nhóm
    },
    roleIcon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    roleText: {
        color: "#fff",
        fontSize: 12,
        marginTop: 5,
    },
    listContainer: {
        justifyContent: "center",
    },
    box: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        margin: 5,
        backgroundColor: "#2e2e2e",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: "80%",
        height: "80%",
        resizeMode: "contain",
    },
});

export default Agent;
