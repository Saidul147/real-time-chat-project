"use client"
import { ConfigProvider } from 'antd'
import React from 'react'

export default function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: '#31304D',
                        borderRadius: 2,

                        // Alias Token
                        // colorBgContainer: '#f6ffed',
                    },
                    components:{
                        Button:{
                            boxShadow:'none',
                            colorPrimaryBgHover:"#31304D",
                            colorPrimaryHover:"#31304d",
                            controlOutline:"none",
                            fontSize:16,
                            colorBorder:"#31304D"
                        }
                    }
                }}
                
            >
                {children}
            </ConfigProvider>
        </div>
    )
}
