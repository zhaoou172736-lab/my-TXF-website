import React, { useState, useEffect, useRef, useCallback } from 'react';

// 定义节点类型
type QuestType = 'main' | 'side';

// 定义节点数据结构
interface QuestNode {
  id: string;
  type: QuestType;
  title: string;
  description: string;
  x: number;
  y: number;
  children: string[];
}

// 定义连接数据结构
interface Connection {
  id: string;
  from: string;
  to: string;
}

const GameDesignTool: React.FC = () => {
  // 节点数据
  const [nodes, setNodes] = useState<QuestNode[]>([
    {
      id: '1',
      type: 'main',
      title: '主线任务 1',
      description: '开始你的冒险之旅',
      x: 100,
      y: 100,
      children: ['2', '3']
    },
    {
      id: '2',
      type: 'main',
      title: '主线任务 2',
      description: '深入探索未知领域',
      x: 300,
      y: 50,
      children: []
    },
    {
      id: '3',
      type: 'side',
      title: '支线任务 1',
      description: '帮助村民解决难题',
      x: 300,
      y: 150,
      children: []
    }
  ]);

  // 连接数据
  const [connections, setConnections] = useState<Connection[]>([
    { id: '1-2', from: '1', to: '2' },
    { id: '1-3', from: '1', to: '3' }
  ]);

  // 选中的节点
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // 拖拽状态
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [draggingCanvas, setDraggingCanvas] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  // 画布引用
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // 处理节点拖拽开始
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string, nodeX: number, nodeY: number) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发画布拖拽
    setDraggingNode(nodeId);
    setDragOffset({
      x: e.clientX - nodeX,
      y: e.clientY - nodeY
    });
    setSelectedNode(nodeId);
  };

  // 处理画布拖拽开始
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setDraggingCanvas(true);
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  // 处理节点拖拽结束
  const handleMouseUp = () => {
    setDraggingNode(null);
    setDraggingCanvas(false);
  };

  // 处理鼠标移动 - 支持节点拖拽和画布拖拽
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // 节点拖拽
    if (draggingNode) {
      setNodes(prevNodes => 
        prevNodes.map(node => {
          if (node.id === draggingNode) {
            return {
              ...node,
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y
            };
          }
          return node;
        })
      );
    } 
    // 画布拖拽
    else if (draggingCanvas) {
      const deltaX = e.clientX - lastMousePosition.current.x;
      const deltaY = e.clientY - lastMousePosition.current.y;
      
      setCanvasOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  }, [draggingNode, dragOffset, draggingCanvas]);

  // 获取节点位置 - 考虑画布偏移
  const getNodePosition = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  // 生成贝塞尔曲线路径
  const generateBezierPath = (fromId: string, toId: string) => {
    const from = getNodePosition(fromId);
    const to = getNodePosition(toId);
    const controlPointOffset = Math.abs(to.x - from.x) / 2;
    
    return `M ${from.x + 80} ${from.y + 40} C ${from.x + controlPointOffset + 80} ${from.y + 40}, ${to.x - controlPointOffset + 80} ${to.y + 40}, ${to.x + 80} ${to.y + 40}`;
  };

  // 生成新节点
  const generateNewNode = () => {
    const newId = (nodes.length + 1).toString();
    const newNode: QuestNode = {
      id: newId,
      type: Math.random() > 0.5 ? 'main' : 'side',
      title: `新任务 ${newId}`,
      description: '自动生成的任务描述',
      x: Math.random() * 500 + 100,
      y: Math.random() * 500 + 100,
      children: []
    };
    setNodes(prev => [...prev, newNode]);
  };

  // 生成主线任务
  const generateMainQuest = () => {
    const newId = (nodes.length + 1).toString();
    const newNode: QuestNode = {
      id: newId,
      type: 'main',
      title: `主线任务 ${newId}`,
      description: '自动生成的主线任务描述',
      x: Math.random() * 500 + 100,
      y: Math.random() * 500 + 100,
      children: []
    };
    setNodes(prev => [...prev, newNode]);
  };

  // 生成支线任务
  const generateSideQuest = () => {
    if (!selectedNode) return;
    
    const newId = (nodes.length + 1).toString();
    const newNode: QuestNode = {
      id: newId,
      type: 'side',
      title: `支线任务 ${newId}`,
      description: '自动生成的支线任务描述',
      x: getNodePosition(selectedNode).x + 200,
      y: getNodePosition(selectedNode).y + 50,
      children: []
    };
    
    setNodes(prev => {
      // 添加新节点
      const updatedNodes = [...prev, newNode];
      // 更新父节点的children数组
      return updatedNodes.map(node => {
        if (node.id === selectedNode) {
          return {
            ...node,
            children: [...node.children, newId]
          };
        }
        return node;
      });
    });
    
    // 添加新连接
    setConnections(prev => [...prev, {
      id: `${selectedNode}-${newId}`,
      from: selectedNode,
      to: newId
    }]);
  };

  // 生成下一个剧情点
  const generateNextPlot = () => {
    if (!selectedNode) return;
    
    const newId = (nodes.length + 1).toString();
    const newNode: QuestNode = {
      id: newId,
      type: nodes.find(n => n.id === selectedNode)?.type || 'main',
      title: `剧情点 ${newId}`,
      description: '基于上一个剧情自动生成的下一个剧情点',
      x: getNodePosition(selectedNode).x + 200,
      y: getNodePosition(selectedNode).y,
      children: []
    };
    
    setNodes(prev => {
      // 添加新节点
      const updatedNodes = [...prev, newNode];
      // 更新父节点的children数组
      return updatedNodes.map(node => {
        if (node.id === selectedNode) {
          return {
            ...node,
            children: [...node.children, newId]
          };
        }
        return node;
      });
    });
    
    // 添加新连接
    setConnections(prev => [...prev, {
      id: `${selectedNode}-${newId}`,
      from: selectedNode,
      to: newId
    }]);
  };

  // 添加事件监听器
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* 16:9 比例的RPG武侠像素风画布 */}
      <section 
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: '90vw',
          height: '50.625vw', // 16:9 比例
          maxWidth: '1920px',
          maxHeight: '1080px',
          background: 'url("data:image/svg+xml,%3Csvg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h8v8H0V0zm8 8h8v8H8V8zm0-8h8v8H8V0zm0 0h8v8H8V0z\" fill=\"%234a3d33\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E") #2a1f18',
          border: '4px solid #5d4037',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleCanvasMouseDown}
      >
        {/* 像素风格的网格背景 */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* 武侠风格的装饰元素 - 左上角 */}
        <div className="absolute top-4 left-4 text-yellow-600 text-2xl font-bold tracking-wider pixel-font">
          江湖任务图谱
        </div>
        
        {/* SVG连接层 - 像素风格线条 */}
        <svg 
          ref={svgRef}
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {connections.map(connection => (
            <path
              key={connection.id}
              d={generateBezierPath(connection.from, connection.to)}
              stroke={nodes.find(n => n.id === connection.from)?.type === 'main' ? '#ffd700' : '#4682b4'}
              strokeWidth="2"
              fill="none"
              strokeLinecap="butt"
              style={{
                filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))'
              }}
            />
          ))}
        </svg>

        {/* 节点层 - 武侠像素风格 */}
        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute cursor-move p-3 transition-all duration-100 ${selectedNode === node.id ? 'ring-2 ring-red-500' : ''}`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              backgroundColor: node.type === 'main' ? '#8b4513' : '#2f4f4f',
              border: `3px solid ${node.type === 'main' ? '#ffd700' : '#4682b4'}`,
              width: '180px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
              borderRadius: '4px',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '12px',
              textAlign: 'center'
            }}
            onMouseDown={(e) => handleNodeMouseDown(e, node.id, node.x, node.y)}
          >
            <h3 style={{
              color: node.type === 'main' ? '#ffd700' : '#4682b4',
              fontWeight: 'bold',
              marginBottom: '8px',
              textShadow: '1px 1px 0px #000'
            }}>
              {node.title}
            </h3>
            <p style={{
              color: '#f0e68c',
              fontSize: '10px',
              marginBottom: '8px',
              lineHeight: '1.4',
              textShadow: '1px 1px 0px #000'
            }}>
              {node.description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#d3d3d3',
              fontSize: '8px',
              textShadow: '1px 1px 0px #000'
            }}>
              <span>{node.type === 'main' ? '主线' : '支线'}</span>
              <span>ID: {node.id}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default GameDesignTool;