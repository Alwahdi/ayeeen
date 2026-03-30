import { Colors } from '@/constants/Colors';

describe('Colors', () => {
  it('has primary color palette', () => {
    expect(Colors.primary).toBeDefined();
    expect(Colors.primary[600]).toBe('#7C3AED');
    expect(Colors.primary[700]).toBe('#6D28D9');
  });

  it('has accent colors', () => {
    expect(Colors.accent.teal).toBe('#2DD4BF');
    expect(Colors.accent.pink).toBe('#F472B6');
    expect(Colors.accent.amber).toBe('#FBBF24');
    expect(Colors.accent.sky).toBe('#38BDF8');
  });

  it('has semantic colors', () => {
    expect(Colors.success).toBe('#22C55E');
    expect(Colors.warning).toBe('#F59E0B');
    expect(Colors.error).toBe('#EF4444');
    expect(Colors.info).toBe('#3B82F6');
  });

  it('has gradient presets', () => {
    expect(Colors.gradients.primary).toHaveLength(3);
    expect(Colors.gradients.dark).toHaveLength(3);
    expect(Colors.gradients.card).toHaveLength(2);
    expect(Colors.gradients.sunset).toHaveLength(3);
  });

  it('has background colors', () => {
    expect(Colors.background.light).toBe('#FFFFFF');
    expect(Colors.background.dark).toBe('#0F0B1A');
  });

  it('has text colors', () => {
    expect(Colors.text.primary).toBe('#171717');
    expect(Colors.text.inverse).toBe('#FFFFFF');
    expect(Colors.text.accent).toBe('#7C3AED');
  });

  it('has neutral palette', () => {
    expect(Colors.neutral[50]).toBe('#FAFAFA');
    expect(Colors.neutral[900]).toBe('#171717');
  });
});
