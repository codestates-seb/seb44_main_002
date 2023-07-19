package project.server.utils;

import lombok.Getter;

public enum UnsignedPermission {
    PERMIT(true),
    NOT_PERMIT(false);

    private final boolean permission;

    UnsignedPermission(boolean permission) {
        this.permission = permission;
    }

    public boolean get(){
        return permission;
    }
}
